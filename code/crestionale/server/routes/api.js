const { ifError } = require('assert')
const { Console } = require('console')
// Import iniziali
const express = require('express')
const { request } = require('http')
const router = express.Router()
const bcrypt = require('bcrypt')
// Import del Json Web Token
const jwt = require('jsonwebtoken')
const fs = require('fs')
// Import di mongoose per connettersi al db
const mongoose = require('mongoose')

// Import del modello di mongoose
const User = require('../models/users') // il comando ../ è one folder up

const db = 'mongodb+srv://admin:admin@crestionaledb.qcw4s.mongodb.net/crestionaleDB?retryWrites=true&w=majority'






module.exports = router