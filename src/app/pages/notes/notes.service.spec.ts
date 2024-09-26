import { TestBed } from '@angular/core/testing';
import { NotesService } from './notes.service';

describe('NotesService', () => {
    let service: NotesService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [NotesService]
        });
        service = TestBed.inject(NotesService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('should add a note', () => {
        service.addNote('Test Note');
        expect(service.getNotes().length).toBe(1);
        expect(service.getNotes()[0].content).toBe('Test Note');
    });

    it('should edit a note', () => {
        service.addNote('Old Note');
        const notes = service.getNotes();
        service.editNote(notes[0], 'Updated Note');
        expect(service.getNotes()[0].content).toBe('Updated Note');
    });

    it('should delete a note', () => {
        service.addNote('Note to delete');
        const notes = service.getNotes();
        service.deleteNote(notes[0]);
        expect(service.getNotes().length).toBe(0);
    });

    it('should toggle edit mode', () => {
        service.addNote('Note with edit mode');
        const notes = service.getNotes();
        service.toggleEditMode(notes[0]);
        expect(notes[0].editMode).toBeTrue();
        service.toggleEditMode(notes[0]);
        expect(notes[0].editMode).toBeFalse();
    });
});
