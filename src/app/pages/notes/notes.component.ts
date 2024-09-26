import { Component } from '@angular/core';
import { NotesService, Note } from './notes.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { trigger, transition, style, animate } from '@angular/animations';

@Component({
    selector: 'app-notes',
    standalone: true,
    imports: [CommonModule, FormsModule],
    providers: [NotesService],
    templateUrl: './notes.component.html',
    styleUrls: ['./notes.component.scss'],
    animations: [
        trigger('listAnimation', [
            transition(':enter', [
                style({ opacity: 0, transform: 'translateY(-20px)' }),
                animate('300ms ease-out', style({ opacity: 1, transform: 'translateY(0)' })),
            ]),
            transition(':leave', [
                animate('300ms ease-out', style({ opacity: 0, transform: 'translateY(-20px)' })),
            ]),
        ]),
    ],
})
export class NotesComponent {
    newNote: string = '';
    darkMode: boolean = false;

    constructor(public notesService: NotesService) {}

    addNote() {
        if (this.newNote.trim()) {
            this.notesService.addNote(this.newNote);
            this.newNote = '';
        }
    }

    toggleEditMode(note: Note) {
        this.notesService.toggleEditMode(note);
    }

    saveEdit(note: Note, updatedContent: string) {
        if (updatedContent.trim()) {
            this.notesService.editNote(note, updatedContent);
        }
    }

    deleteNoteWithConfirmation(note: Note) {
        const confirmed = confirm('Are you sure you want to delete this note?');
        if (confirmed) {
            this.notesService.deleteNote(note);
        }
    }

    // Toggle between dark and light mode
    toggleTheme() {
        this.darkMode = !this.darkMode;
    }

    // Track each note by its createdTimestamp for uniqueness
    trackByCreatedTimestamp(index: number, note: Note): string {
        return note.createdTimestamp.toISOString();
    }
}
