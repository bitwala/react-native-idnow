
Pod::Spec.new do |s|
  s.name         = "RNIdnow"
  s.version      = "1.0.0"
  s.summary      = "RNIdnow"
  s.description  = <<-DESC
                  RNIdnow
                   DESC
  s.homepage     = "https://github.com/bitwala/react-native-idnow"
  s.license      = "MIT"
  # s.license      = { :type => "MIT", :file => "FILE_LICENSE" }
  s.author             = { "author" => "author@domain.cn" }
  s.platform     = :ios, "7.0"
  s.source       = { :git => "https://github.com/author/RNIdnow.git", :tag => "master" }
  s.source_files  = "RNIdnow/**/*.{h,m}"
  s.requires_arc = true


  s.dependency "React"
  #s.dependency "others"

end

  