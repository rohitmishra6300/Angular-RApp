using RDAL.Base;
using RDAL.Modal;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace RDAL.Repository
{
    public class UserRepository : DbContext
    {

        #region Properties
        protected ApiContext _Context;
        protected ApiContext Db
        {
            get
            {
                if (_Context == null)
                    _Context = new ApiContext();
                return _Context;
            }
        }
        #endregion

        #region Constructer
        public UserRepository() : base("DbConnection")
        {

        }
        #endregion

        #region Methods
        public IQueryable<User> Get()
        {
            try
            {
                return Db.User.OrderBy(x => x.Id);
            }
            catch (Exception)
            {
                throw;
            }
        }
        public User GetById(long Id)
        {
            try
            {
                return Db.User.Find(Id);
            }
            catch (Exception)
            {
                throw;
            }
        }
        public void Create(User user)
        {
            try
            {
                Db.User.Add(user);
                Save();
            }
            catch (Exception)
            {
                throw;
            }
        }
        public void Update(User user)
        {
            try
            {
                Db.User.Attach(user);
                Db.Entry(user).State = EntityState.Modified;
                Save();
            }
            catch (Exception)
            {
                throw;
            }
        }
        public void Delete(User user)
        {
            try
            {
                Db.User.Remove(user);
                Save();
            }
            catch (Exception)
            {
                throw;
            }
        }
        public void Save()
        {
            try
            {
                Db.SaveChanges();
            }
            catch (Exception)
            {
                throw;
            }
        }
        public bool IsExists(string Email)
        {
            try
            {
                return Db.User.Where(x => x.Email.ToLower().Trim() == Email.ToLower().Trim()).Any();
            }
            catch (Exception)
            {
                throw;
            }
        }
        public  void Dispose(bool disposing)
        {
            if (disposing)
            {
                Db.Dispose();
            }
            base.Dispose(disposing);
        }
        #endregion

    }
}
