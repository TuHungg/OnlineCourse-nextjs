const FormMsg = {
    required: 'is a required field',
    maxLength: ({ max }: { max: Number }) => `must be at most ${length} characters`,
    minLength: ({ min }: { min: Number }) => `must be at least ${min} characters`,
    same: (field: string) => `and ${field.toLowerCase()} must be same`,
    unique: 'already taken',
    length: ({ length }: { length: Number }) => `must be exactly ${length} characters`,
    minQty: ({ qty }: { qty: Number }) => `should contain at least ${qty} items.`,
    trim: 'cannot include leading and trailing spaces',
}
export default FormMsg
