const fetchHotelsFilter = async ({
  pageParam = 0,
  // 지역, 날짜, .... 추가 예정 
  const filters = { grade=[], min_price=[], max_pirce=[], location=[], bed_type=[], view=[], facilities=[], services=[]  },
  // TODO: 가격 이외의 조건이 있다면 객체로 변경 해야 함  { price: "asc", rating: "desc" }
  sortOrder = ''
}: {
  pageParam?: number;
  filters: {
    grade: number[];
    minPrice: number;
    maxPrice: number;
    facilities: string[];
    services: string[];
  };
  sortOrder?: 'asc' | 'desc' | '';
}) => {
  const gradeQuery = filters.grade.length ? `&grade=in.(${filters.grade.join(',')})` : '';
  const priceQuery = `&minPrice=${filters.minPrice}&maxPrice=${filters.maxPrice}`;
  const facilitiesQuery = filters.facilities.length ? `&facilities=${filters.facilities.join(',')}` : '';
  const servicesQuery = filters.services.length ? `&services=${filters.services.join(',')}` : '';
  const sortQuery = sortOrder ? `&sortOrder=${sortOrder}` : '';

  // TODO: supabase로
  // let query = supabase.from("hotels").select("*");

  // if (filters.grade.length > 0 ) {
  //   // query.eq("type", ~~~)
  // }

  // if (filters.location) {
  //   query.eq("location", filters.location)
  // }

  // if (sortOrder) {
  //   query.order("~~~", s)
  // }

  // query.limit(10).offset(pageParam * 10)
  // 1,2,3,4,5,6,7,8,9,10, 11, 12, 13, 14, 15, 16, 17,... 

  // await query

  // 



  if (!res.ok) {
    throw new Error(`Failed to fetch hotels: ${res.status}`);
  }

  const data = await res.json();
  return {
    items: data.items,
    totalCount: data.totalCount
  };
};
