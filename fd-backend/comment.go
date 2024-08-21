package main

import (
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"strconv"

	"github.com/go-chi/chi/v5"
	_ "github.com/go-sql-driver/mysql"
)

type Comment struct {
	CommentID int    `json:"commentID"`
	Comment   string `json:"comment"`
	TicketID  int    `json:"ticketID"`
}

func createComment(w http.ResponseWriter, r *http.Request) {
	idParam := chi.URLParam(r, "id")
	id, err := strconv.Atoi(idParam)
	if err != nil {
		http.Error(w, "Invalid ID", http.StatusBadRequest)
		return
	}
	var comment Comment
	json.NewDecoder(r.Body).Decode(&comment)

	query, err := db.Prepare("INSERT Comments SET comment=?, ticketID=?")
	if err != nil {
		log.Fatal(err)
		fmt.Println("is the json wrong")
	}

	_, er := query.Exec(comment.Comment, id)
	if er != nil {
		log.Fatal(err)
		fmt.Println("Or is the query not executing")
	}

	defer query.Close()

	respondWithJSON(w, http.StatusOK, map[string]string{"message": "updated OK"})
}

func getCommentByTicketID(w http.ResponseWriter, r *http.Request) {

	idParam := chi.URLParam(r, "id")
	id, err := strconv.Atoi(idParam)
	if err != nil {
		http.Error(w, "invalid ID", http.StatusBadRequest)
		return
	}

	var ticket_comment []Comment

	rows, err := db.Query("SELECT commentID,comment,ticketID FROM comments where ticketID=?", id)
	if err != nil {
		http.Error(w, http.StatusText(500), 500)
		return
	}

	defer rows.Close()

	for rows.Next() {

		var comment Comment
		err := rows.Scan(&comment.CommentID, &comment.Comment, &comment.TicketID)
		if err != nil {
			http.Error(w, http.StatusText(500), 500)
			fmt.Println("There is an error in the SELECT QUERY LINE 72")
			return
		}

		ticket_comment = append(ticket_comment, comment)
	}

	jsonResponse, err := json.Marshal(ticket_comment)
	if err != nil {
		http.Error(w, http.StatusText(500), 500)
		fmt.Println("Goodbye world line 67")
		return
	}

	w.Header().Set("Content-Type", "application/json")
	w.Write(jsonResponse)
}
