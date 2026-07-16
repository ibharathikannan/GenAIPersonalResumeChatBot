import { TestBed, inject } from '@angular/core/testing';
import { AuthenticateService } from './authenticate.service';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { TestingModule } from '@testing/utils';
import { AuthenticationModel } from '@app/core/auth/auth.models';
import { HttpTestingController } from '@angular/common/http/testing';

describe('AuthenticateService', () => {
  let httpClientSpy: { get: jasmine.Spy, post: jasmine.Spy };
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;
  let service: AuthenticateService;

  const testAuthModel = new AuthenticationModel();
  testAuthModel.login = 'wi.tf@samsung.com';
  testAuthModel.password = 'VFR$5tgb';
      
  beforeEach(() => {
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['post', 'get']);

    TestBed.configureTestingModule({
      imports: [TestingModule],
      providers: [
        AuthenticateService,
        { provide: HttpClient, useValue: httpClientSpy }
      ]
    })

    service = TestBed.get(AuthenticateService);
    // Inject the http service and test controller for each test
    httpClient = TestBed.get(HttpClient);
    httpTestingController = TestBed.get(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  // authenticate()
  it('should able to call login', () => {
    const response: any = {
      response: 'testtoken'
    };

    httpClientSpy.post.and.returnValue(response);

    expect(service.authenticate(testAuthModel)).toBe(response, 'token was returned.');
    expect(httpClientSpy.post.calls.count()).toBe(1, 'spy method was called once');
    expect(httpClientSpy.post.calls.mostRecent().returnValue).toBe(response);
  });

  // getAuthenticatedUser() 
  it('should return authenticate user', () => {
    const response: any = {
      response: 'authUser'
    };

    httpClientSpy.get.and.returnValue(response);

    expect(service.getAuthenticatedUser()).toBe(response, 'authUser was returned.');
    expect(httpClientSpy.get.calls.count()).toBe(1, 'spy method was called once');
    expect(httpClientSpy.get.calls.mostRecent().returnValue).toBe(response);
  });

  // getAuthenticatedUserId() 
  it('should return authenticate user id', () => {
    const response: any = {
      response: 1
    };

    httpClientSpy.get.and.returnValue(response);

    expect(service.getAuthenticatedUserId()).toBe(response, 'authUserId was returned.');
    expect(httpClientSpy.get.calls.count()).toBe(1, 'spy method was called once');
    expect(httpClientSpy.get.calls.mostRecent().returnValue).toBe(response);
  });

  // getAuthenticatedUserCountryCode() 
  it('should return authenticate user country code', () => {
    const response: any = {
        code: 'SAPL', 
        name: 'SAPL', 
        country: 'Singapore'
    };

    httpClientSpy.get.and.returnValue(response);

    expect(service.getAuthenticatedUserCountryCode()).toBe(response, 'authUserSub was returned.');
    expect(httpClientSpy.get.calls.count()).toBe(1, 'spy method was called once');
    expect(httpClientSpy.get.calls.mostRecent().returnValue).toBe(response);
  });

  // getToken()
  it('should return token from getToken function', () => {
    var auth = service.getToken();
    expect(auth).toBe(null);
    let obj = { isAuthenticated:true, token: 'testToken' };
    let authJson = JSON.stringify(obj);

    localStorage.setItem(`${'EUS-'}${'AUTH'}`, authJson );
    var auth = service.getToken();

    expect(auth).toBe('testToken');
  });

  // logout()  
  it('should able to call logout', () => {
    const response: any = undefined;

    httpClientSpy.post.and.returnValue(response);

    expect(service.logout()).toBe(undefined, 'log out successful.');
    expect(httpClientSpy.post.calls.count()).toBe(1, 'spy method was called once');
    expect(httpClientSpy.post.calls.mostRecent().returnValue).toBe(undefined);
  });
  

  // checkPassword
  it('checkPassword', () => {
    const response: any = {
      responce: true
    }; 

    httpClientSpy.post.and.returnValue(response);

    expect(service.checkPassword('CDE#$RVF')).toBe(response, 'Return true if the password is correct.');
    expect(httpClientSpy.post.calls.count()).toBe(1, 'spy method was called once');
    expect(httpClientSpy.post.calls.mostRecent().returnValue).toBe(response);
  })

  // getUserRoleList
  it('should return authenticate role list', () => {
    const response: any = {
      response: 1
    };

    httpClientSpy.get.and.returnValue(response);

    expect(service.getUserRoleList()).toBe(response, 'authUserId was returned.');
    expect(httpClientSpy.get.calls.count()).toBe(1, 'spy method was called once');
    expect(httpClientSpy.get.calls.mostRecent().returnValue).toBe(response);
  });

  // getUserRoleMenuID
  it('should return getUserRoleMenuId role menu ID', () => {
    const response: any = {
      response: 1
    };

    let param = { role: { name: 'Admin'} };

    httpClientSpy.post.and.returnValue(response);

    expect(service.getUserRoleMenuID('Admin')).toBe(response, 'getUserRoleMenuId was returned.');
    expect(httpClientSpy.post.calls.count()).toBe(1, 'spy method was called once');
    expect(httpClientSpy.post.calls.mostRecent().returnValue).toBe(response);
  });
  
  // isEmailExists
  it('should be able to call isEmailExists', () => {
    const response: any = {
        response: false
    };

    httpClientSpy.post.and.returnValue(response);

    expect(service.isEmailExists(testAuthModel.login)).toBe(response);
    expect(httpClientSpy.post.calls.count()).toBe(1);
    expect(httpClientSpy.post.calls.mostRecent().returnValue).toBe(response);
  });
});
