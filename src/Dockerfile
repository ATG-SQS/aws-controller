FROM centos:centos6

# Enable EPEL for Node.js
RUN rpm -Uvh http://download.fedoraproject.org/pub/epel/6/i386/epel-release-6-8.noarch.rpm

# Install node.js an npm
RUN yum install -y npm

RUN npm install aws-sdk

# Bundle app source
COPY . /src

# Install app dependencies
RUN cd /src; npm install

EXPOSE 5000
CMD ["node", "/src/awsController.js"]
