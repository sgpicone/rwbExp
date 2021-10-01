import http from "../http-common";

class KegDataService {
    getAll() {
        return http.get("/kegs");
    }

    get(rwbId) {
        return http.get(`/kegs/${rwbId}`);
    }

    create(data) {
        return http.post("/kegs", data);
    }

    update(rwbId, data) {
        return http.put(`/kegs/${rwbId}`, data);
    }

    delete(rwbId) {
        return http.delete(`/kegs/${rwbId}`);
    }

    wash(rwbId, data) {
        return http.put(`/kegs/${rwbId}/wash`, data);
    }

    sani(rwbId, data) {
        return http.put(`/kegs/${rwbId}/sani`, data);
    }

    breakdown(rwbId, data) {
        return http.put(`/kegs/${rwbId}/breakdown`, data);
    }

    fill(rwbId, data) {
        return http.put(`/kegs/${rwbId}/fill`, data);
    }

    kick(rwbId, data) {
        return http.put(`/kegs/${rwbId}/relocate`, data);
    }

    sell(rwbId, data) {
        return http.put(`/kegs/${rwbId}/relocate`, data);
    }

    untap(rwbId, data) {
        return http.put(`/kegs/${rwbId}/relocate`, data);
    }

    tap(rwbId, data) {
        return http.put(`/kegs/${rwbId}/relocate`, data);
    }

    log_issue(rwbId, data) {
        return http.put(`/kegs/${rwbId}/log_issue`, data);
    }

}

export default new KegDataService();