/*
 * JBoss, Home of Professional Open Source
 * Copyright Red Hat, Inc., and individual contributors.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *         http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
'use strict';

var aeroConfig = {
    serverURL : "http://aerodoc-sblanc.rhcloud.com/",
    simplePushServerURL : "https://judconpush-sblanc.rhcloud.com:8443/simplepush",
    pushServerURL : "https://judconpush-sblanc.rhcloud.com",
    variantID : "a829c594-491f-4b8b-9642-0660c1b6a1a2",
    variantSecret : "3ad7310f-0f16-42ce-82be-7528ffc69c59"
}

var aerodoc = angular.module('aerodoc', [ 'aerodoc.filters' ]).config(
        [ '$routeProvider', function($routeProvider) {
            $routeProvider.when('/Leads', {
                templateUrl : 'partials/Lead/search.html',
                controller : SearchLeadController
            }).when('/Leads/show/:LeadId', {
                    templateUrl : 'partials/Lead/show.html',
                    controller : ShowLeadController
                }).when('/Leads/accepted', {
                    templateUrl : 'partials/Lead/searchlocal.html',
                    controller : SearchAcceptedLeadController
                }).when('/SaleAgents/edit/:SaleAgentId', {
                    templateUrl : 'partials/SaleAgent/detail.html',
                    controller : EditSaleAgentController
                }).otherwise({
                    templateUrl : 'partials/Lead/search.html',
                    controller : SearchLeadController
                });
        } ]).run(function($rootScope, notifierService, dataService) {
        var leadPipe = dataService.leadPipe;
        leadPipe.read({
            success : function(data) {
                AeroGear.SimplePushClient({
                    simplePushServerURL : aeroConfig.simplePushServerURL,
                    onConnect : function() {
                        var message = "loginDone";
                        $rootScope.$broadcast('loginDone', message);
                        notifierService.connector();
                    }
                });

            }

        });
    });