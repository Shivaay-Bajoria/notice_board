const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
  description: { type: String, required: true },
  quantity: { type: Number, required: true, min: 1 },
  unitPrice: { type: Number, required: true, min: 0 },
  total: { type: Number, required: true } // quantity * unitPrice
});

const poSchema = new mongoose.Schema({
  poNumber: { 
    type: String, 
    required: true, 
    unique: true 
  },
  requester: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: true 
  },
  vendorName: { 
    type: String, 
    required: true 
  },
  items: [itemSchema],
  totalAmount: { 
    type: Number, 
    required: true 
  },
  status: { 
    type: String, 
    enum: ['Draft', 'Pending Approval', 'Approved', 'Fulfilled', 'Rejected', 'Cancelled'], 
    default: 'Pending Approval' 
  },
  approvedBy: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User' 
  } // Null until a manager approves it
}, { timestamps: true });

module.exports = mongoose.model('PurchaseOrder', poSchema);