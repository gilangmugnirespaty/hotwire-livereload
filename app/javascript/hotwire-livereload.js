import { createConsumer } from "@rails/actioncable"
import received from "./lib/hotwire-livereload-received"

const consumer = createConsumer()
consumer.subscriptions.create("Hotwire::Livereload::ReloadChannel", {
  received,

  connected() {
    console.log("[Hotwire::Livereload] Websocket connected")

    document.addEventListener('turbo:load', function() {
      document.documentElement.scrollTo(0, window.HotwireLiveReloadLastScrollTop)
    });
  },

  disconnected() {
    console.log("[Hotwire::Livereload] Websocket disconnected")
  },
})
