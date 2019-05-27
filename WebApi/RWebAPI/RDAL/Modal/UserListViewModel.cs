using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace RDAL.Modal
{
    public class UserListViewModel
    {
        public long Id { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Email { get; set; }
        public string Address { get; set; }
        public int TotalCount { set; get; }
        public int PageNumber { get; set; }
        public int PageSize { get; set; }
    }
}
