package main

import (
	"net/http"

	"github.com/go-chi/chi/v5"
	"github.com/go-chi/cors"
)

var router *chi.Mux

func main() {

	connectToDB()
	FreshDeskApi()
	http.ListenAndServe(":3000", router)

}

func init() {
	router = chi.NewRouter()
	router.Use(cors.Handler(cors.Options{
		AllowedOrigins:   []string{"https://*", "http://*"},
		AllowedMethods:   []string{"GET", "POST", "PUT", "DELETE", "OPTIONS"},
		AllowedHeaders:   []string{"Accept", "Authorization", "Content-Type", "X-CSRF-Token", "Access-Control-Allow-Origin"},
		ExposedHeaders:   []string{"Link"},
		AllowCredentials: true,
		MaxAge:           300,
	}))

}

func FreshDeskApi() *chi.Mux {

	router.Post("/api/v1/createTicket", createTicket)
	router.Get("/api/v1/getTickets", getAllTickets)
	router.Get("/api/v1/getTicket/{id}", getTicketByID)
	return router
}
