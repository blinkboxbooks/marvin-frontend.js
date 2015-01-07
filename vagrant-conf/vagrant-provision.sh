#!/usr/bin/env bash

echo "Provisioning web-dev VM"

# ---------------------------------------------
# nginx conf
# ---------------------------------------------
cp -a /vagrant/vagrant-conf/nginx/conf/. /usr/local/nginx/conf
cp /vagrant/vagrant-conf/nginx/init.d/nginx /etc/init.d/nginx
chmod 775 /etc/rc.d/init.d/nginx
chkconfig --add nginx
chkconfig nginx on
service nginx start

# -------------------------------------------------------------------------
# Allow gem installation without sudo e.g. for gems required by smoke tests
# -------------------------------------------------------------------------
chown -R vagrant:vagrant /usr/local/rvm/gems/*

# Install specific packages for headless Firefox testing with Protractor.
yum install xorg-x11-server-Xvfb-1.15.0 firefox-31.1.0-5.el6.centos -y

# Required for headless Firefox.
Xvfb :1 -screen 0 1280x768x24 &
echo "export DISPLAY=:1;export BUILD_NUMBER=$1" >>/etc/bashrc

# Install all Node modules.
cd /vagrant/ && npm install && bower install --allow-root

# Install Protractor version of Selenium Webdriver.
/vagrant/node_modules/grunt-protractor-runner/scripts/webdriver-manager-update

