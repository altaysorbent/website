# Get servers list:
set - f
# Variables from GitLab server:
# Note: They can't have spaces!!
SERVER=$DEPLOY_SERVER_PROD
HOME_PATH=$HOME_PATH_PROD
PORT=$DEPLOY_SERVER_PORT_PROD

rsync -rav -e "ssh -p $PORT" --delete public/ gitlab@"$SERVER":"$HOME_PATH"