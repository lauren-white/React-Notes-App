import React from "react"
import Sidebar from "./components/Sidebar"
import Editor from "./components/Editor"
import Split from "react-split"
import { nanoid } from "nanoid"
import { doc, deleteDoc, onSnapshot, addDoc, updateDoc } from "firebase/firestore"
import { notesCollection } from "./firebase"
export default function App() {
    const [notes, setNotes] = React.useState([])
    
    const [currentNoteId, setCurrentNoteId] = React.useState("")
    
    const currentNote = 
        notes.find(note => note.id === currentNoteId) 
        || notes[0]

    React.useEffect(() => {
        const unsubscribe = onSnapshot(notesCollection, function(snapshot) {
            // Sync up our local notes array with the snapshot data
            const notesArr = snapshot.docs.map(doc => ({
                ...doc.data(),
                id: doc.id
            }))
            setNotes(notesArr)
        })
        return unsubscribe
    }, [])

    React.useEffect(() => {
        if (!currentNoteId) {
            setCurrentNoteId(notes[0]?.id)
        }
    }, [notes])

    async function createNewNote() {
        const newNote = {
            body: "# Type your markdown note's title here"
        }
        const newNoteRef = await addDoc(notesCollection, newNote)
        setCurrentNoteId(newNoteRef.id)
    }

    function updateNote(text) {
        const updateRef = doc(notesCollection, currentNote.id)
        updateDoc(updateRef, {
        body: text
        })
    }

    async function deleteNote(noteId) {
        const docRef = await deleteDoc(doc(notesCollection, noteId))
    }

    return (
        <main>
            {
                notes.length > 0
                    ?
                    <Split
                        sizes={[30, 70]}
                        direction="horizontal"
                        className="split"
                    >
                        <Sidebar
                            notes={notes}
                            currentNote={currentNote}
                            setCurrentNoteId={setCurrentNoteId}
                            newNote={createNewNote}
                            deleteNote={deleteNote}
                        />
                      
                            <Editor
                                currentNote={currentNote}
                                updateNote={updateNote}
                            />
 
                    </Split>
                    :
                    <div className="no-notes">
                        <h1>You have no notes</h1>
                        <button
                            className="first-note"
                            onClick={createNewNote}
                        >
                            Create one now
                </button>
                    </div>

            }
        </main>
    )
}
