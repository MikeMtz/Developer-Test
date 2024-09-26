import { Injectable, signal } from '@angular/core';

export interface Note {
    content: string;
    createdTimestamp: Date;
    lastUpdatedTimestamp: Date | null; // Null if never updated
    editMode: boolean;
    isNew: boolean;
}

@Injectable()
export class NotesService {
    private notes = signal<Note[]>([]);

    // Get the current list of notes, sorted by most recent creation first
    getNotes() {
        return this.notes().slice().sort((a, b) => b.createdTimestamp.getTime() - a.createdTimestamp.getTime());
    }

    // Add a new note
    addNote(content: string) {
        const newNote: Note = {
            content,
            createdTimestamp: new Date(),
            lastUpdatedTimestamp: null,
            editMode: false,
            isNew: true,
        };
        this.notes.update(notes => [...notes, newNote]);
    }

    // Find a note by its unique timestamp and toggle edit mode
    toggleEditMode(note: Note) {
        this.notes.update(notes => {
            const foundNote = notes.find(n => n.createdTimestamp.getTime() === note.createdTimestamp.getTime());
            if (foundNote) {
                foundNote.editMode = !foundNote.editMode;
            }
            return [...notes];
        });
    }

    // Save edited note content
    editNote(note: Note, updatedContent: string) {
        this.notes.update(notes => {
            const foundNote = notes.find(n => n.createdTimestamp.getTime() === note.createdTimestamp.getTime());
            if (foundNote) {
                foundNote.content = updatedContent;
                foundNote.lastUpdatedTimestamp = new Date();
                foundNote.isNew = false;
                foundNote.editMode = false;
            }
            return [...notes];
        });
    }

    // Delete a note
    deleteNote(note: Note) {
        this.notes.update(notes => notes.filter(n => n.createdTimestamp.getTime() !== note.createdTimestamp.getTime()));
    }
}
