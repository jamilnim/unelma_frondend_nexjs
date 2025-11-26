import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchInquiries } from "../../lib/features/inquiry/inquirySlice";
import { getStrapiMedia } from "../../lib/api";

export default function InquiryList() {
  const dispatch = useDispatch();
  const { inquiries, loading } = useSelector((state) => state.inquiry);

  useEffect(() => {
    dispatch(fetchInquiries());
  }, [dispatch]);

  if (loading) return <p>Loading...</p>;

  return (
    <div>
      {inquiries.map((inq) => (
        <div key={inq.id}>
          <h3>{inq.attributes.subject}</h3>
          <p>{inq.attributes.message}</p>
          {inq.attributes.file && (
            <a href={getStrapiMedia(inq.attributes.file)} target="_blank">
              Download File
            </a>
          )}
        </div>
      ))}
    </div>
  );
}
