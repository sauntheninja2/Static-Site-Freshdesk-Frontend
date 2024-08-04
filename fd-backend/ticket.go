package main

import (
	"database/sql"
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"strconv"

	"github.com/go-chi/chi/v5"
	_ "github.com/go-sql-driver/mysql"
)

var db *sql.DB

type Ticket struct {
	TicketID    int    `json:"ticketID"`
	Title       string `json:"title"`
	Description string `json:"description"`
}

func connectToDB() {
	var err error
	db, err = sql.Open("mysql", "dev:password@tcp(127.0.0.1:3306)/freshdesk")
	if err != nil {
		log.Fatal(err)
	}

	pingErr := db.Ping()
	if pingErr != nil {
		log.Fatal(pingErr.Error())
	}
}

func createTicket(w http.ResponseWriter, r *http.Request) {
	var ticket Ticket
	json.NewDecoder(r.Body).Decode(&ticket)

	query, err := db.Prepare("INSERT Tickets SET title=? , description=?")
	if err != nil {
		log.Fatal(err)
	}

	_, er := query.Exec(ticket.Title, ticket.Description)
	if er != nil {
		log.Fatal(err)
	}

	defer query.Close()

	respondWithJSON(w, http.StatusOK, map[string]string{"message": "updated OK"})
}

func getAllTickets(w http.ResponseWriter, r *http.Request) {

	var bugs []Ticket

	rows, err := db.Query("SELECT ticketID , title , description from tickets")
	if err != nil {
		http.Error(w, http.StatusText(500), 500)
		fmt.Println("There is an error in the SELECT QUERY LINE 58")
		return
	}

	defer rows.Close()

	for rows.Next() {
		var ticket Ticket
		err := rows.Scan(&ticket.TicketID, &ticket.Title, &ticket.Description)
		if err != nil {
			http.Error(w, http.StatusText(500), 500)
			fmt.Println("There is an error in the SELECT QUERY LINE 72")
			return
		}

		bugs = append(bugs, ticket)
	}

	if err = rows.Err(); err != nil {
		http.Error(w, http.StatusText(500), 500)
		return
	}

	jsonResponse, err := json.Marshal(bugs)
	if err != nil {
		http.Error(w, http.StatusText(500), 500)
		fmt.Println("There is an error in the SELECT QUERY LINE 87")
		return
	}

	w.Header().Set("Content-Type", "application/json")

	w.Write(jsonResponse)

	//Get All Tickets
}

func getTicketByID(w http.ResponseWriter, r *http.Request) {

	idParam := chi.URLParam(r, "id")
	id, err := strconv.Atoi(idParam)
	fmt.Println(id)
	if err != nil {
		http.Error(w, "Invalid ID", http.StatusBadRequest)
		return
	}

	var ticket Ticket

	err = db.QueryRow("SELECT ticketID, title , description from tickets WHERE ticketID=?", id).Scan(&ticket.TicketID, &ticket.Title, &ticket.Description)
	if err == sql.ErrNoRows {
		http.Error(w, "Ticket not found", http.StatusNotFound)
		return
	} else if err != nil {
		http.Error(w, http.StatusText(500), 500)
		fmt.Println("Hello World line 116")
		return
	}

	jsonResponse, err := json.Marshal(ticket)
	if err != nil {
		http.Error(w, http.StatusText(500), 500)
		fmt.Println("Hello World line 123")
		return
	}

	w.Header().Set("Content-Type", "application/json")

	w.Write(jsonResponse)
	//Get Ticket by ID ticketID
}
