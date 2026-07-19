import User from '../models/user.model.js';

const cookieOptions = {
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax'
};

export const registerUser = async (req, res) => {
    try {
        const { FullName, email, password, contact } = req.body;

        if (!FullName || !email || !password || !contact) {
            return res.status(400).json({ success: false, message: 'All fields are required' });
        }

        const userExists = await User.findOne({ email });

        if (userExists) {
            return res.status(400).json({ success: false, message: 'Email already exists' });
        }

        const user = await User.create({
            FullName,
            email,
            password,
            contact
        });

        if (!user) {
            return res.status(500).json({ success: false, message: 'User registration failed, please try again' });
        }

        await user.save();

        user.password = undefined;

        const token = await user.generateJWTToken();

        res.cookie('token', token, cookieOptions);

        res.status(201).json({
            success: true,
            message: 'User registered successfully',
            user
        });

    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ success: false, message: 'All fields are required' });
        }

        const user = await User.findOne({ email }).select('+password');

        if (!user || !(await user.comparePassword(password))) {
            return res.status(400).json({ success: false, message: 'Email or password does not match' });
        }

        const token = await user.generateJWTToken();
        user.password = undefined;

        res.cookie('token', token, cookieOptions);

        res.status(200).json({
            success: true,
            message: 'User logged in successfully',
            user
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

export const logout = (req, res) => {
    res.cookie('token', null, {
        secure: process.env.NODE_ENV === 'production',
        maxAge: 0,
        httpOnly: true
    });

    res.status(200).json({
        success: true,
        message: 'User logged out successfully'
    });
};

export const getProfile = async (req, res) => {
    try {
        const userId = req.user.id;
        const user = await User.findById(userId);

        res.status(200).json({
            success: true,
            message: 'User details',
            user
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

export const forgotPassword = async (req, res) => {
    // Basic placeholder for now
    res.status(200).json({ success: true, message: 'Forgot password' });
};

export const resetPassword = async (req, res) => {
    // Basic placeholder
    res.status(200).json({ success: true, message: 'Reset password' });
};

export const changePassword = async (req, res) => {
    // Basic placeholder
    res.status(200).json({ success: true, message: 'Change password' });
};

export const updateUser = async (req, res) => {
    try {
        const { id } = req.params;
        const { FullName, contact } = req.body;
        
        const user = await User.findByIdAndUpdate(id, {
            FullName,
            contact
        }, { new: true, runValidators: true });

        if(!user) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }

        res.status(200).json({
            success: true,
            message: 'User updated successfully',
            user
        });
    } catch(error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
