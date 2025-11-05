import { HTTPSTATUS, HttpStatusCode } from "../../config/http.config";
import { ErrorCode } from "../enums/error-code.enums";
import { AppError } from "./AppError";


export class NotFoundException extends AppError{
    constructor(message="Resource Not Found",errorCode?:ErrorCode) {
        super(message , HTTPSTATUS.NOT_FOUND,errorCode||ErrorCode.RESOURCE_NOT_FOUND)

    }
}

export class HttpException extends AppError{
    constructor(message="Http Exception Error",statusCode:HttpStatusCode,errorCode?:ErrorCode) {
        super(message , statusCode,errorCode||ErrorCode.INTERNAL_SERVER_ERROR)
    }
}

export class UnauthorizedException extends AppError{
    constructor(message="Unauthorized Access",errorCode?:ErrorCode) {
        super(message , HTTPSTATUS.UNAUTHORIZED,errorCode||ErrorCode.ACCESS_UNAUTHORIZED)
    }
}

export class InternalServerException extends AppError{
    constructor(message="Internal Server Error",errorCode?:ErrorCode) {
        super(message , HTTPSTATUS.INTERNAL_SERVER_ERROR,errorCode||ErrorCode.INTERNAL_SERVER_ERROR)
    }
}

export class BadRequestException extends AppError{
    constructor(message="Bad Request Error",errorCode?:ErrorCode) {
        super(message , HTTPSTATUS.BAD_REQUEST,errorCode||ErrorCode.VALIDATION_ERROR)
    }
}