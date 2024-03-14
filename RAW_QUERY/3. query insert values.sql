
INSERT INTO public.employee (nik,"name",is_active,start_date,end_date,created_at,updated_at)
VALUES 
('11012','Budi',TRUE,'2022-12-12','2029-12-12', now(), now()),
('11013','Jarot',TRUE,'2021-09-01','2028-09-01', now(), now());

INSERT INTO public.employee_education (employee_id,"name","level",description,created_by,updated_by)
	VALUES 
(1,'SMKN 7 Jakarta','Sma','Sekolah Menengah Atas','admin','admin'),
(2,'Universitas Negeri Jakarta','Strata 1','Sarjana','admin','admin');


INSERT INTO public.employee_profile (employee_id,place_of_birth,date_of_birth,gender,is_married,created_by,updated_by)
	VALUES 
(1,'Jakarta','1997-05-02','Laki-Laki',true,'admin','admin'),
(2,'Sukabumi','1996-05-02','Laki-Laki',false,'admin','admin');


INSERT INTO public.employee_family (employee_id,"name",identifier,place_of_birth,date_of_birth,religion,relation_status,created_by,updated_by)
	VALUES 
(1,'Marni','32100594109960002','Denpasar','1995-10-17','Islam','Istri','admin','admin'),
(1,'Clara','32100594109020004','Bangkalan','2008-10-17','Islam','Anak','admin','admin'),
(1,'Stephanie','32100594109020005','Bangkalan','2008-10-17','Islam','Anak','admin','admin');
