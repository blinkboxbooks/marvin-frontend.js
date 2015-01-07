# -*- mode: ruby -*-
# vi: set ft=ruby :

# Vagrantfile API/syntax version. Don't touch unless you know what you're doing!
VAGRANTFILE_API_VERSION = "2"

Vagrant.configure(VAGRANTFILE_API_VERSION) do |config|
  config.vm.box = "web-dev-1408021004"
  config.vm.box_url = "http://kernick.blinkbox.local/Web/web-dev-1408021004.box"

  config.vm.synced_folder ".", "/vagrant", type: "nfs", nfs_udp: false
  config.vm.network "private_network", ip: "192.168.255.2"

  config.vm.provider :virtualbox do |vb|
    vb.customize ["modifyvm", :id, "--memory", "1024"]
    # Enable Network Address Translation option to speed up external requests from VM
    vb.customize ["modifyvm", :id, "--natdnshostresolver1", "on"]
    vb.customize ["modifyvm", :id, "--natdnsproxy1", "on"]
  end

  # Provision using bash script
  # first, fix the 'stdin: is not a tty' problem when trying to 'vagrant up'
  config.ssh.shell = "bash -c 'BASH_ENV=/etc/profile exec bash'"

  # Run provisioning script
  config.vm.provision :shell, :path => "vagrant-conf/vagrant-provision.sh", args: ENV['BUILD_NUMBER']

  config.vm.network "forwarded_port", guest: 80, host: 8443, auto_correct: true
end