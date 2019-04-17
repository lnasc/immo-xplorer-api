#Service Plan
$resourceGroup = "immo-xplorer-awc";
$location = "westeurope";
az group create -l $location -n $resourceGroup;
$planName = "immo-xplorer-awc";
az appservice plan create -n $planName -g $resourceGroup `
    -l $location --is-linux --sku S1;
#App Service
$appName = "immo-xplorer-api";
$dockerRepo = "scratch";
az webapp create -n $appName -g $resourceGroup --plan $planName -i $dockerRepo
#App service acr config
$acrName = "lnasc";
$acrLoginServer = az acr show -n $acrName --query loginServer -o tsv;
$acrUserName = az acr credential show -n $acrName --query username -o tsv;
$acrPassword = az acr credential show -n $acrName --query passwords[0].value -o tsv;
az webapp config container set -n $appName -g $resourceGroup `
    -c "$acrLoginServer/immo-xplorer-api" `
    -r "https://$acrLoginServer" `
    -u $acrUserName -p $acrPassword
#Staging slot creation
az webapp deployment slot create -g $resourceGroup -n $appName `
    -s staging --configuration-source $appName
#CD config
az webapp deployment container config -g $resourceGroup -n $appName `
    -s staging --enable-cd true
$cdUrl = az webapp deployment container show-cd-url -s staging `
    -n $appName -g $resourceGroup --query CI_CD_URL -o tsv
az acr webhook create --registry $acrName --name myacrwebhook --actions push `
    --uri $cdUrl
#Slot swap command
az webapp deployment slot swap -g $resourceGroup -n $appName `
    --slot staging --target-slot production