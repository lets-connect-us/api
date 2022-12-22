#! /bin/bash

#get current directory
current_dir=$( cd -- "$( dirname -- "${BASH_SOURCE[0]} ")" &> /dev/null && pwd );

#create symlink if needed
if [ ! -d "${current_dir}/src/common" ] && [ -d "${current_dir}/shared_code/node_common" ]; then
	ln -s "${current_dir}/shared_code/node_common" "${current_dir}/src/common";
	echo 'I created the symbolic link /shared_code/node_common -> /src/common';
fi

#copy node app files
cp ${current_dir}/shared_code/node_app/. ${current_dir} -R

#//leftoff lookup dev .env and add to Github wiki (and files)

#tell the user we're done
echo 'Done the install script! Now run NPM INSTALL.';
