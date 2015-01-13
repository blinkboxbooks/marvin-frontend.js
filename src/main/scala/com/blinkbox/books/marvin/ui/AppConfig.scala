package com.blinkbox.books.marvin.ui

import com.blinkbox.books.config.ApiConfig
import com.typesafe.config.Config

import scala.concurrent.duration.FiniteDuration

case class AppConfig(api: ApiConfig)


object AppConfig {
  val prefix = "service.marvinui"
  def apply(config: Config) = new AppConfig(
    ApiConfig(config, prefix)
  )
}
