select
	e.id as employee_id,
	e.nik ,
	e."name" ,
	e.is_active ,
	ep.gender,
	CONCAT(DATE_PART('year',
	AGE(NOW(),
	ep.date_of_birth)),
	' Years Old') as age,
	ed.school_name,
	ed.levels,
	coalesce (ef.keterangan,
	'-') as family_data
from
	employee e
left join employee_profile ep on
	ep.employee_id = e.id
left join (
	select
		employee_id,
		STRING_AGG(relation_status_count,
		' & ') as keterangan
	from
		(
		select
			ef.employee_id,
			CONCAT(COUNT(*),
			' ',
			ef.relation_status) as relation_status_count
		from
			employee_family ef
		group by
			ef.employee_id,
			ef.relation_status
) as ef_subquery
	group by
		employee_id
) ef on
	ef.employee_id = e.id
left join (
	select
		ee.employee_id ,
		STRING_AGG(ee."name",
		', ') as school_name,
		STRING_AGG(ee."level"::text,
		', ') as levels
	from
		public.employee_education ee
	group by
		ee.employee_id 
) ed on
	ed.employee_id = e.id