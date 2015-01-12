
Name: marvin-front-end
Version: %{version}
Release: %{release}
Summary: %{name} rpm
Source0: %{name}-%{version}.tar.gz
Group: Applications/Internet
License: Various
Vendor: blinkbox books
BuildArch: noarch
BuildRoot: %{_tmppath}/%{name}-buildroot

%description
Marvin front end based on AngularJS

%prep

%setup -q

%build

%install

ls -l

# client web app
%{__install} -d %{buildroot}%{_localstatedir}/www/admin
%{__cp} -r * %{buildroot}%{_localstatedir}/www/admin

%clean
rm -rf %{buildroot}

%post

%files
%defattr(0644, root, root, 0755)
%{_localstatedir}/www/admin/*