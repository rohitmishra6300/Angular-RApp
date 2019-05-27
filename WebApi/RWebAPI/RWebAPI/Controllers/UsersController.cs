using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Description;
using RDAL.Base;
using RDAL.Modal;
using RDAL.Repository;
using System.Web.Http.Cors;

namespace RWebAPI.Controllers
{
    [EnableCors(origins: "*", headers: "*", methods: "*")]
    public class UsersController : ApiController
    {
        #region Properties
        protected UserRepository _UserRepository;
        protected UserRepository UserRepository
        {
            get
            {
                if (_UserRepository == null)
                    _UserRepository = new UserRepository();
                return _UserRepository;
            }
        }
        #endregion

        //GET: api/Users/
        /// <summary>
        /// Method is used for fetch user details with pagination data
        /// </summary>
        /// <param name="PageNumber"></param>
        /// <param name="PageSize"></param>
        /// <param name="Filter"></param>
        /// <param name="SortBy"></param>
        /// <param name="SortByFilter"></param>
        /// <returns></returns>
        public IQueryable<UserListViewModel> GetUser(int PageNumber = 0, int PageSize = 5, string Filter = "", int SortBy = 1,string SortByFilter="")
        {
            int skip = (PageNumber - 1) * PageSize;
            IQueryable<User> Users = UserRepository.Get();
            if (!string.IsNullOrEmpty(Filter) || !string.IsNullOrEmpty(SortByFilter))
            {
                Users = Users.Where(x => x.Email.ToLower().Trim().Contains(Filter.ToLower().Trim()) || x.FirstName.ToLower().Trim().Contains(Filter.ToLower().Trim()));
            }
            int TotalCount = UserRepository.Get().Count();

            Users = OrderByFilter(Filter: SortByFilter, Users:Users,SortBy:SortBy);
            return Users.Select(x => new UserListViewModel()
            {
                Id = x.Id,
                FirstName = x.FirstName,
                LastName = x.LastName,
                Email = x.Email,
                Address = x.Address,
                TotalCount = TotalCount,
                PageNumber = PageNumber,
                PageSize = PageSize
            });
        }

        // GET: api/Users/


        // GET: api/Users/5
        [ResponseType(typeof(User))]
        public IHttpActionResult GetUser(long id)
        {
            User user = UserRepository.GetById(id);
            if (user == null)
            {
                return NotFound();
            }

            return Ok(user);
        }

        // PUT: api/Users/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutUser(long id, User user)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != user.Id)
            {
                return BadRequest();
            }
            try
            {
                UserRepository.Update(user);
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!UserExists(user.Email))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return StatusCode(HttpStatusCode.NoContent);
        }

        // POST: api/Users
        [ResponseType(typeof(User))]
        public IHttpActionResult PostUser(User user)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            if (!UserExists(user.Email))
            {
                UserRepository.Create(user);
                return CreatedAtRoute("DefaultApi", new { id = user.Id }, user);
            }
            else
            {
                return NotFound();
            }
        }

        // DELETE: api/Users/5
        [ResponseType(typeof(User))]
        public IHttpActionResult DeleteUser(long id)
        {
            User user = UserRepository.GetById(id);
            if (user == null)
            {
                return NotFound();
            }

            UserRepository.Delete(user);

            return Ok(user);
        }

        private bool UserExists(string Email)
        {
            return UserRepository.IsExists(Email: Email);
        }
        public IQueryable<User> OrderByFilter(string Filter, IQueryable<User> Users, int SortBy)
        {
            try
            {
                if (SortBy == 1)
                {
                    return OrderByAsc(Filter: Filter, Users: Users);
                }
                else
                {
                    return OrderByDesc(Filter: Filter, Users: Users);
                }
            }
            catch (Exception)
            {
                throw;
            }
        }
        private IQueryable<User> OrderByDesc(string Filter, IQueryable<User> Users)
        {
            switch (Filter)
            {
                case "email":
                    Users.OrderByDescending(x => x.LastName);
                    break;
                case "firstname":
                    Users.OrderByDescending(x => x.FirstName);
                    break;
                case "lastName":
                    Users.OrderByDescending(x => x.LastName);
                    break;
                case "address":
                    Users.OrderByDescending(x => x.Address);
                    break;
                default:
                    Users.OrderByDescending(x => x.Email);
                    break;
            }
            return Users;
        }
        private IQueryable<User> OrderByAsc(string Filter, IQueryable<User> Users)
        {
            switch (Filter)
            {
                case "email":
                    Users.OrderBy(x => x.LastName);
                    break;
                case "firstname":
                    Users.OrderBy(x => x.FirstName);
                    break;
                case "lastName":
                    Users.OrderBy(x => x.LastName);
                    break;
                case "address":
                    Users.OrderBy(x => x.Address);
                    break;
                default:
                    Users.OrderBy(x => x.Email);
                    break;
            }
            return Users;
        }
    }
}