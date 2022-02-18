import axios from 'axios';

class Services{
    addNote(data){
        return axios.post(`/api/note`, data);
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

}

export default Services;