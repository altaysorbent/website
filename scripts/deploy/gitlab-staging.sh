# Get servers list:
set - f
# Variables from GitLab server:
# Note: They can't have spaces!!
SERVER=$DEPLOY_SERVER
HOME_PATH=$HOME_PATH
PORT=$DEPLOY_SERVER_PORT

rsync -rav -e "ssh -p $PORT" --delete public/ gitlab@"$SERVER":"$HOME_PATH"