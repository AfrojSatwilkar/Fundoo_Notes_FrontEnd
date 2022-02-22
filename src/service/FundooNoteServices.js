import axios from 'axios';

class FundooNoteServices{
    register(data) {
        return axios.post(`/api/register`, data);
    }

    login(data) {
        return axios.post(`/api/login`, data);
    }

    logout() {
        return axios.post(`/api/logout`);
    }

    forgotPassword(data) {
        return axios.post(`/api/forgotpassword`, data);
    }

    resetPassword(data, config) {
        return axios.post(`/api/resetpassword`, data, config);
    }

    addNote(data){
        return axios.post(`/api/note`, data);
    }

    displayNote() {
        return axios.get(`/api/note`);
    }

    editNote(data){
        return axios.post(`/api/updatenote`,data);
    }

    deleteNote(data){
        return axios.post(`/api/deletenote`, data);
    }

    trashNote(data){
        return axios.post(`/api/trashnote`, data);
    }

    untrashNote(data) {
        return axios.post(`/api/restorenote`, data);
    }

    getLabel() {
        return axios.get(`/api/label`);
    }

    editLabel(data) {
        return axios.post(`/api/updatelabel`, data);
    }

    deleteLabel(data) {
        return axios.post(`/api/deletelabel`, data);
    }

    addColab(data) {
        return axios.post(`/api/addcolab`, data);
    }

    editColabNote(data) {
        return axios.post(`/api/updatecolab`,data);
    }

    removeColabNote(data) {
        return axios.post(`/api/deletecolab`, data);
    }

    addReminder(data) {
        return axios.post(`/api/addreminder`, data);
    }

    editReminder(data) {
        return axios.post(`/api/editreminder`, data);
    }

    displayReminder() {
        return axios.get(`/api/getremindernote`);
    }

    deleteReminder(data) {
        return axios.post(`/api/deletereminder`, data);
    }

    addNoteLabel(data) {
        return axios.post(`/api/notelabel`, data);
    }

    deleteNoteLabel(data) {
        return axios.post(`/api/deletenotelabel`, data);
    }
}

export default FundooNoteServices;