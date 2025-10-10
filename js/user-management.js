class UserManagement {
    constructor() {
        this.users = this.loadUsers();
        this.currentUser = null;
        this.init();
    }
    
    init() {
        this.setupEventListeners();
        this.checkAuthStatus();
    }
    
    setupEventListeners() {
        window.addEventListener('storage', (e) => {
            if (e.key === 'heritage_users') {
                this.users = this.loadUsers();
            }
        });
    }
    
    async registerUser(userData) {
        try {
            if (!this.isValidEmail(userData.email)) {
                throw new Error('Invalid email format');
            }
            
            if (this.userExists(userData.email)) {
                throw new Error('User already exists with this email');
            }
            
            if (!this.isValidPassword(userData.password)) {
                throw new Error('Password must be at least 6 characters long');
            }
            
            const user = {
                id: this.generateId(),
                name: userData.name.trim(),
                email: userData.email.toLowerCase().trim(),
                password: this.hashPassword(userData.password),
                isEmailVerified: false,
                emailVerificationToken: this.generateToken(),
                createdAt: new Date().toISOString(),
                lastLogin: null,
                profile: {
                    avatar: null,
                    bio: '',
                    interests: [],
                    favoriteStates: [],
                    visitedPlaces: []
                },
                preferences: {
                    notifications: true,
                    newsletter: true,
                    language: 'en'
                }
            };
            
            this.users.push(user);
            this.saveUsers();
            
            await this.sendVerificationEmail(user);
            
            return {
                success: true,
                user: this.sanitizeUser(user),
                message: 'Account created successfully! Please check your email for verification.'
            };
            
        } catch (error) {
            return {
                success: false,
                message: error.message
            };
        }
    }
    
    async loginUser(email, password) {
        try {
            const user = this.users.find(u => u.email === email.toLowerCase().trim());
            
            if (!user) {
                throw new Error('User not found');
            }
            
            if (!this.verifyPassword(password, user.password)) {
                throw new Error('Invalid password');
            }
            
            user.lastLogin = new Date().toISOString();
            this.saveUsers();
            
            this.currentUser = user;
            this.createSession(user);
            
            return {
                success: true,
                user: this.sanitizeUser(user),
                message: `Welcome back, ${user.name}!`
            };
            
        } catch (error) {
            return {
                success: false,
                message: error.message
            };
        }
    }
    
    async verifyEmail(token) {
        try {
            const user = this.users.find(u => u.emailVerificationToken === token);
            
            if (!user) {
                throw new Error('Invalid verification token');
            }
            
            user.isEmailVerified = true;
            user.emailVerificationToken = null;
            this.saveUsers();
            
            return {
                success: true,
                message: 'Email verified successfully!'
            };
            
        } catch (error) {
            return {
                success: false,
                message: error.message
            };
        }
    }
    
    async requestPasswordReset(email) {
        try {
            const user = this.users.find(u => u.email === email.toLowerCase().trim());
            
            if (!user) {
                throw new Error('User not found');
            }
            
            const resetToken = this.generateToken();
            user.passwordResetToken = resetToken;
            user.passwordResetExpires = new Date(Date.now() + 3600000).toISOString();
            this.saveUsers();
            
            await this.sendPasswordResetEmail(user, resetToken);
            
            return {
                success: true,
                message: 'Password reset instructions sent to your email'
            };
            
        } catch (error) {
            return {
                success: false,
                message: error.message
            };
        }
    }
    
    async updateProfile(userId, profileData) {
        try {
            const user = this.users.find(u => u.id === userId);
            
            if (!user) {
                throw new Error('User not found');
            }
            
            if (profileData.name) user.name = profileData.name.trim();
            if (profileData.bio !== undefined) user.profile.bio = profileData.bio.trim();
            if (profileData.interests) user.profile.interests = profileData.interests;
            if (profileData.favoriteStates) user.profile.favoriteStates = profileData.favoriteStates;
            
            this.saveUsers();
            
            return {
                success: true,
                user: this.sanitizeUser(user),
                message: 'Profile updated successfully!'
            };
            
        } catch (error) {
            return {
                success: false,
                message: error.message
            };
        }
    }
    
    addFavoriteState(userId, stateName) {
        try {
            const user = this.users.find(u => u.id === userId);
            
            if (!user) {
                throw new Error('User not found');
            }
            
            if (!user.profile.favoriteStates.includes(stateName)) {
                user.profile.favoriteStates.push(stateName);
                this.saveUsers();
            }
            
            return {
                success: true,
                message: `${stateName} added to favorites!`
            };
            
        } catch (error) {
            return {
                success: false,
                message: error.message
            };
        }
    }
    
    addVisitedPlace(userId, placeName, stateName) {
        try {
            const user = this.users.find(u => u.id === userId);
            
            if (!user) {
                throw new Error('User not found');
            }
            
            const visitedPlace = {
                name: placeName,
                state: stateName,
                visitedAt: new Date().toISOString()
            };
            
            user.profile.visitedPlaces.push(visitedPlace);
            this.saveUsers();
            
            return {
                success: true,
                message: `${placeName} added to visited places!`
            };
            
        } catch (error) {
            return {
                success: false,
                message: error.message
            };
        }
    }
    
    getUserStats(userId) {
        try {
            const user = this.users.find(u => u.id === userId);
            
            if (!user) {
                throw new Error('User not found');
            }
            
            return {
                success: true,
                stats: {
                    favoriteStates: user.profile.favoriteStates.length,
                    visitedPlaces: user.profile.visitedPlaces.length,
                    memberSince: user.createdAt,
                    lastLogin: user.lastLogin,
                    isEmailVerified: user.isEmailVerified
                }
            };
            
        } catch (error) {
            return {
                success: false,
                message: error.message
            };
        }
    }
    
    userExists(email) {
        return this.users.some(u => u.email === email.toLowerCase().trim());
    }
    
    isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
    
    isValidPassword(password) {
        return password && password.length >= 6;
    }
    
    hashPassword(password) {
        let hash = 0;
        for (let i = 0; i < password.length; i++) {
            const char = password.charCodeAt(i);
            hash = ((hash << 5) - hash) + char;
            hash = hash & hash;
        }
        return hash.toString();
    }
    
    verifyPassword(password, hashedPassword) {
        return this.hashPassword(password) === hashedPassword;
    }
    
    generateId() {
        return Date.now().toString(36) + Math.random().toString(36).substr(2);
    }
    
    generateToken() {
        return Math.random().toString(36).substr(2) + Date.now().toString(36);
    }
    
    sanitizeUser(user) {
        const sanitized = { ...user };
        delete sanitized.password;
        delete sanitized.emailVerificationToken;
        delete sanitized.passwordResetToken;
        delete sanitized.passwordResetExpires;
        return sanitized;
    }
    
    createSession(user) {
        const sessionData = {
            id: user.id,
            email: user.email,
            name: user.name,
            loginTime: new Date().toISOString()
        };
        localStorage.setItem('heritage_user_session', JSON.stringify(sessionData));
    }
    
    checkAuthStatus() {
        const session = localStorage.getItem('heritage_user_session');
        if (session) {
            try {
                const sessionData = JSON.parse(session);
                const user = this.users.find(u => u.id === sessionData.id);
                
                if (user) {
                    this.currentUser = user;
                    return true;
                } else {
                    localStorage.removeItem('heritage_user_session');
                }
            } catch (error) {
                localStorage.removeItem('heritage_user_session');
            }
        }
        return false;
    }
    
    logout() {
        this.currentUser = null;
        localStorage.removeItem('heritage_user_session');
    }
    
    async sendVerificationEmail(user) {
        console.log(`Sending verification email to ${user.email}`);
        console.log(`Verification token: ${user.emailVerificationToken}`);
        return Promise.resolve();
    }
    
    async sendPasswordResetEmail(user, resetToken) {
        console.log(`Sending password reset email to ${user.email}`);
        console.log(`Reset token: ${resetToken}`);
        return Promise.resolve();
    }
    
    loadUsers() {
        const users = localStorage.getItem('heritage_users');
        return users ? JSON.parse(users) : [];
    }
    
    saveUsers() {
        localStorage.setItem('heritage_users', JSON.stringify(this.users));
    }
    
    exportUserData(userId) {
        const user = this.users.find(u => u.id === userId);
        if (user) {
            const dataStr = JSON.stringify(this.sanitizeUser(user), null, 2);
            const dataBlob = new Blob([dataStr], { type: 'application/json' });
            const url = URL.createObjectURL(dataBlob);
            const link = document.createElement('a');
            link.href = url;
            link.download = `heritage-profile-${user.name}.json`;
            link.click();
            URL.revokeObjectURL(url);
        }
    }
    
    importUserData(file) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = (e) => {
                try {
                    const userData = JSON.parse(e.target.result);
                    resolve(userData);
                } catch (error) {
                    reject(new Error('Invalid file format'));
                }
            };
            reader.readAsText(file);
        });
    }
}

let userManager;
document.addEventListener('DOMContentLoaded', () => {
    userManager = new UserManagement();
});

window.UserManagement = UserManagement;

