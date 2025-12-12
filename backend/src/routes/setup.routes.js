const express = require('express');
const router = express.Router();
const { makeUserAdmin } = require('../controllers/setup.controller');

// POST /api/setup/make-admin - Convertir usuario en admin (sin autenticación para setup inicial)
router.post('/make-admin', makeUserAdmin);

module.exports = router;
