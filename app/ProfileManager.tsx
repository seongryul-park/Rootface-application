import * as SecureStore from 'expo-secure-store';

class UserProfile {
    private static instance: UserProfile | null = null;

    private age: number = 20;
    private weight: number = 70;
    private height: number = 180;
    private level: number = 1; //  0 ~ 10    
    
    private storageKey: string = "userProfile";
    private gpxStorageKey: string = "gpxFiles";

    private constructor() {}

    static getInstance(): UserProfile { // Singleton pattern
        if (!UserProfile.instance) {
            UserProfile.instance = new UserProfile();
        }
        return UserProfile.instance;
    }

    async saveUserToSecureStorage() {
        try {
            const userProfile = JSON.stringify({
                age: this.age,
                weight: this.weight,
                height: this.height,
                level: this.level
            });
            
            await SecureStore.setItemAsync(this.storageKey, userProfile);
        } catch (error) {
            console.error('Error saving user data:', error);
        }
    }

    async loadUserFromSecureStorage() {
        try {
            const storedData = await SecureStore.getItemAsync(this.storageKey);
            
            if (storedData) {
                const parsedData = JSON.parse(storedData);
                this.age = parsedData.age;
                this.weight = parsedData.weight;
                this.height = parsedData.height;
                this.level = parsedData.level;
                console.log('User data loaded:', parsedData);
            } else {
                console.log('No data found');
            }
        } catch (error) {
            console.error('Error loading user data:', error);
        }
    }

    async saveGPXFile(fileName: string, gpxData: string) {
        try {
            const timestamp = Date.now();
            const storedFiles = await SecureStore.getItemAsync(this.gpxStorageKey);
            let files = storedFiles ? JSON.parse(storedFiles) : [];

            const fileEntry = { name: `${timestamp}_${fileName}`, timestamp };
            files.push(fileEntry);

            await SecureStore.setItemAsync(this.gpxStorageKey, JSON.stringify(files));
            await SecureStore.setItemAsync(`gpxData_${fileEntry.name}`, gpxData);
            
            console.log('GPX file saved successfully');
        } catch (error) {
            console.error('Error saving GPX file:', error);
        }
    }

    async getAllGPXFiles() {
        try {
            const storedFiles = await SecureStore.getItemAsync(this.gpxStorageKey);
            return storedFiles ? JSON.parse(storedFiles) : [];
        } catch (error) {
            console.error('Error retrieving GPX files:', error);
            return [];
        }
    }

    async getGPXFile(fileName: string) {
        try {
            const gpxData = await SecureStore.getItemAsync(`gpxData_${fileName}`);
            return gpxData || null;
        } catch (error) {
            console.error('Error retrieving GPX file:', error);
            return null;
        }
    }
}

export default UserProfile;
