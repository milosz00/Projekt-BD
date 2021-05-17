export class AdminCredentials {
    private password = "123456";
    private email = "admin@admin.com";

    getPassword() {
        return this.password;
    }

    getEmail() {
        return this.email;
    }
}