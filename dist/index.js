"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const core = __importStar(require("@actions/core"));
const axios_1 = __importDefault(require("axios"));
function callApi() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // Get inputs from the GitHub Action metadata
            const apiUrl = core.getInput('api_url');
            const apiKey = core.getInput('api_key');
            const changes = core.getInput('changes');
            const revision = core.getInput('revision');
            const releaseStage = core.getInput('release_stage') || 'production';
            const projectId = core.getInput('project_id');
            // Prepare the request payload
            const payload = {
                api_key: apiKey,
                revision,
                release_stage: releaseStage,
                changes
            };
            // Make the API request
            const response = yield axios_1.default.post(`${apiUrl}/${projectId}/deployments`, payload);
            // Log and set output for the GitHub Action
            console.log('Deployment successful:', response.data);
            core.setOutput('response', response.data);
        }
        catch (error) {
            // Narrow the type of error to 'Error' before accessing message
            if (error instanceof Error) {
                console.error('Error during deployment:', error.message);
                core.setFailed(`Deployment failed: ${error.message}`);
            }
            else {
                console.error('Unknown error occurred');
                core.setFailed('Deployment failed due to an unknown error');
            }
        }
    });
}
callApi();
