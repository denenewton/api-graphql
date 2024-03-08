import GridLayout from "../../../components/GridLayout";
import FormUpdate from "../FormUpdate";

export default function page({ params }) {
  return (
    <GridLayout pathname={`/update`}>
      <FormUpdate slug={params.slug} />
    </GridLayout>
  );
}
