const https = require('https');
const fs = require('fs');
const path = require('path');
const dir = path.join(__dirname, 'public', 'icons');
if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

const icons = {
  ubuntu: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/ubuntu/ubuntu-original.svg',
  nginx: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/nginx/nginx-original.svg',
  redis: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/redis/redis-original.svg',
  typescript: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/typescript/typescript-original.svg',
  mongodb: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/mongodb/mongodb-original.svg',
  vue: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/vuejs/vuejs-original.svg',
  angular: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/angularjs/angularjs-original.svg',
  svelte: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/svelte/svelte-original.svg',
  graphql: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/graphql/graphql-plain.svg',
  kalilinux: 'https://unpkg.com/simple-icons@v11.0.0/icons/kalilinux.svg',
  metasploit: 'https://unpkg.com/simple-icons@v11.0.0/icons/metasploit.svg'
};

async function download() {
  for (const [name, url] of Object.entries(icons)) {
    await new Promise(resolve => {
      // Use curl to handle redirects automatically (especially for unpkg)
      const { exec } = require('child_process');
      exec(`curl -L -s ${url} -o ${path.join(dir, name + '.svg')}`, (err) => {
        if (!err) {
            let data = fs.readFileSync(path.join(dir, name + '.svg'), 'utf8');
            if (data.includes('<svg')) {
                if (!data.includes('width=')) {
                    data = data.replace('<svg', '<svg width="256" height="256"');
                }
                if (!data.includes('xmlns=')) {
                    data = data.replace('<svg', '<svg xmlns="http://www.w3.org/2000/svg"');
                }
                fs.writeFileSync(path.join(dir, name + '.svg'), data);
                console.log('Saved', name);
            }
        }
        resolve();
      });
    });
  }
}
download();
