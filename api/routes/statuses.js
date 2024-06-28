import express from 'express';
import { 
    getAllOrdersWithStatus, 
    getStatusById, 
    getStatusesByWaybillNumber, 
    createStatus, 
    updateStatus, 
    deleteStatus 
} from '../controllers/status.js';

const router = express.Router();



router.get('/', getAllOrdersWithStatus);
router.get('/:id', getStatusById);
// router.get('/user/:user_id', getStatusesByUserId);
router.post('/', createStatus);
router.put('/:id', updateStatus);
router.delete('/:id', deleteStatus);
router.get('/waybill/:waybill_number', getStatusesByWaybillNumber);

export default router;
