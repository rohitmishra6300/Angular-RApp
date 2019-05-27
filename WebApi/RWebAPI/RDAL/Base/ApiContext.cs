using RDAL.Modal;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace RDAL.Base
{
    public class ApiContext: DbContext
    {
        public ApiContext():base("DbConnection")
        {

        }
        public DbSet<User> User { set; get; }
    }
}
