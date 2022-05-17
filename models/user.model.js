module.exports = (mongoose) => {
    const User = mongoose.model(
        "user",
        mongoose.Schema(
            {
                name: { type: String, required: true },
                phone_number: { type: String, required: true },
                password: { type: String, required: true },
                isLoggedIn: { type: Boolean, default: false },
                token: String
            },
            { timestamps: true }
        )
    );
    return User;
};
