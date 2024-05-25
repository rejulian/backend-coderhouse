import { Command } from 'commander';

export const program = new Command()
program
    .option('-s <storage>', 'Variable name for persistent storage', 'MONGO')
    .option('-p <port>', 'Port to connect to', 8080)
    .option('--mode <mode>', 'Mode of operation', 'development')
program.parse()