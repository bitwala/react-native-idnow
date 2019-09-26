require 'json'

package = JSON.parse(File.read(File.join(__dir__, '../package.json')))
Pod::Spec.new do |s|
  s.name         = "RNIdnow"
  s.version      = package['version']
  s.summary      = package['description']
  s.license      = package['license']

  s.authors      = package['author']
  s.homepage     = package['homepage']
  s.platform     = :ios, "9.0"
  s.ios.deployment_target = '9.0'
  s.source       = { :git => "https://github.com/bitwala/react-native-idnow.git", :tag => "master" }
  s.source_files  = "RNIdnow/**/*.{h,m}"
  s.requires_arc = true

  s.dependency "React"

end
  
