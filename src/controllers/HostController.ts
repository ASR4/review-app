
import { OK, BAD_REQUEST } from 'http-status-codes';
import { Controller, Get, Post } from '@overnightjs/core';
import { Logger } from '@overnightjs/logger';
import { Request, Response } from 'express';
import { generateSuggestion } from '../services/suggestion';

@Controller('api/')
class HostController {

    public static readonly SUCCESS_MSG = 'hello ';

    @Get('say-hello/:name')
    private sayHello(req: Request, res: Response) {
        try {
            const { name } = req.params;
            if (name === 'make_it_fail') {
                throw Error('User triggered failure');
            }
            Logger.Info(HostController.SUCCESS_MSG  + name);
            return res.status(OK).json({
                message: HostController.SUCCESS_MSG + name,
            });
        } catch (err) {
            Logger.Err(err, true);
            return res.status(BAD_REQUEST).json({
                error: err,
            });
        }
    }

    @Post('save-financial-information')
    private saveFinancialInformation(req: Request, res: Response) {
        try {
            const { age, riskTolerance, currentNetWorth, annualIncome, debt } = req.body;
            const financialInfo = { age, riskTolerance, currentNetWorth, annualIncome, debt };
      
            // Generate a suggestion based on the form data
            const suggestion = generateSuggestion(financialInfo);

            // TODO: Process the form data and save it to the database
            return res.status(OK).json({
                message: 'Form data saved successfully',
                suggestion: suggestion,
            });
        } catch (err) {
            Logger.Err(err, true);
            return res.status(BAD_REQUEST).json({
                error: err,
            });
        }
    }
}

export default HostController;