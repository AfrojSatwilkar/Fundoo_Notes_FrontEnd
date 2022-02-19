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

    addColab(data) {
        return axios.post(`/api/addcolab`, data);
    }

    editColabNote(data) {
        return axios.post(`/api/updatecolab`,data);
    }

    removeColabNote(data) {
        return axios.post(`/api/deletecolab`, data);
    }
}

export default FundooNoteServices;