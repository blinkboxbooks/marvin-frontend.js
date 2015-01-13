lazy val root = (project in file(".")).
  settings(
    name := "marvin-ui-service",
    organization := "com.blinkbox.books.marvin",
    version := scala.util.Try(scala.io.Source.fromFile("VERSION").mkString.trim).getOrElse("0.0.0"),
    scalaVersion := "2.11.4",
    scalacOptions := Seq("-unchecked", "-deprecation", "-feature", "-encoding", "utf8", "-target:jvm-1.7", "-Xfatal-warnings", "-Xfuture"),
    libraryDependencies ++= {
      val sprayV = "1.3.2"
      Seq(
        "com.blinkbox.books" %% "common-config"     % "2.1.0",
        "com.blinkbox.books" %% "common-spray"      % "0.22.2"
      )
    }
  ).
  settings(rpmPrepSettings: _*)