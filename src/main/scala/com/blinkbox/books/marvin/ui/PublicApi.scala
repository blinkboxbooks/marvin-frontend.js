package com.blinkbox.books.marvin.ui

import akka.actor.ActorRefFactory
import com.blinkbox.books.config.ApiConfig
import com.blinkbox.books.logging.DiagnosticExecutionContext
import com.blinkbox.books.spray.v2.Implicits.throwableMarshaller
import com.blinkbox.books.spray.{Directives => CommonDirectives, _}
import com.typesafe.scalalogging.StrictLogging
import org.slf4j.LoggerFactory
import spray.http.HttpHeaders._
import spray.http.StatusCodes
import spray.routing.directives.FileAndResourceDirectives
import spray.routing.{HttpService, Route}
import spray.http.Uri.Path

trait PublicApiRoutes extends HttpService {
  def mappings: Route
}

class PublicApi(config: ApiConfig)
               (implicit val actorRefFactory: ActorRefFactory) extends PublicApiRoutes with CommonDirectives with StrictLogging with FileAndResourceDirectives {

  implicit val executionContext = DiagnosticExecutionContext(actorRefFactory.dispatcher)
  implicit val timeout = config.timeout
  implicit val log = LoggerFactory.getLogger(classOf[PublicApi])

  val mappings = get {
    path(Rest) { path =>
      val defaultPath = if (path.isEmpty) "index.html" else path
      getFromResource(s"site/${defaultPath}")
    }
  }

  val routes = rootPath(config.localUrl.path) {
    monitor(logger, throwableMarshaller) {
      respondWithHeader(RawHeader("Vary", "Accept, Accept-Encoding")) {
        mappings
      }
    }
  }
}