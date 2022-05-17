module.exports = (mongoose) => {
    const Order = mongoose.model(
        "order",
        mongoose.Schema(
            {
                user_id: { type: String, required: true },
                sub_total: { type: Number, required: true },
                phone_number: { type: String, required: true },
            },
            { timestamps: true }
        )
    );
    return Order;
};
