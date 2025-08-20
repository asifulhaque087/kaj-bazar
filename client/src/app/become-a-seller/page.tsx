"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, useFieldArray } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { CalendarIcon, PlusCircle, MinusCircle } from "lucide-react";
import { useEffect } from "react";
import { useAuthStore } from "@/store/use-auth.store";
import { useCreateSeller } from "@/api/sellers";
import { createSellerDefaultForm } from "@/forms";
import { createSellerForm, CreateSellerForm } from "@/schemas";

function ProfileForm() {
  const { buyer } = useAuthStore();

  const form = useForm<CreateSellerForm>({
    resolver: zodResolver(createSellerForm),
    defaultValues: createSellerDefaultForm(null),
    mode: "onChange",
  });

  useEffect(() => {
    if (buyer) {
      // Only reset if authUser exists
      form.reset(createSellerDefaultForm(buyer));
    }
  }, [buyer, form]);

  // Field Arrays for dynamic lists
  const {
    fields: languageFields,
    append: appendLanguage,
    remove: removeLanguage,
  } = useFieldArray({
    control: form.control,
    name: "languages",
  });

  const {
    fields: skillFields,
    append: appendSkill,
    remove: removeSkill,
  } = useFieldArray({
    control: form.control,
    name: "skills",
  });

  const {
    fields: experienceFields,
    append: appendExperience,
    remove: removeExperience,
  } = useFieldArray({
    control: form.control,
    name: "experience",
  });

  const {
    fields: educationFields,
    append: appendEducation,
    remove: removeEducation,
  } = useFieldArray({
    control: form.control,
    name: "education",
  });

  const {
    fields: socialLinkFields,
    append: appendSocialLink,
    remove: removeSocialLink,
  } = useFieldArray({
    control: form.control,
    name: "socialLinks",
  });

  const {
    fields: certificateFields,
    append: appendCertificate,
    remove: removeCertificate,
  } = useFieldArray({
    control: form.control,
    name: "certificates",
  });

  const { mutate: createSeller } = useCreateSeller({
    reset: form.reset,
    setError: form.setError,
  });

  // console.log(
  //   vals.username == authUser?.username ? "loaded-form" : "loading-form"
  // );

  console.log("buyer is !!!!!!!!!!!!!!!!! ", buyer);

  return (
    <Form {...form}>
      <form
        // onSubmit={form.handleSubmit((data) => createSeller(data))}
        onSubmit={form.handleSubmit((data) => console.log(data))}
        className="space-y-8 p-4"
      >
        <h2 className="text-2xl font-bold">Personal Information</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="fullName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Full Name</FormLabel>
                <FormControl>
                  <Input placeholder="John Doe" {...field} />
                </FormControl>
                <FormDescription>
                  This is your public display name.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              // <FormItem className="hidden">
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input placeholder="john.doe.seller" {...field} />
                </FormControl>
                <FormDescription>
                  Your unique username for logging in.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                {/* <FormItem className="hidden"> */}
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    placeholder="john.doe@example.com"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="profilePicture"
            render={({ field }) => (
              // <FormItem className="hidden">
              <FormItem>
                <FormLabel>Profile Picture URL</FormLabel>
                <FormControl>
                  <Input
                    placeholder="https://example.com/profile.jpg"
                    {...field}
                  />
                </FormControl>
                <FormDescription>A URL to your profile image.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="country"
            render={({ field }) => (
              // <FormItem className="hidden">
              <FormItem>
                <FormLabel>Country</FormLabel>
                <FormControl>
                  <Input placeholder="United States" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="oneliner"
            render={({ field }) => (
              <FormItem className="col-span-1 md:col-span-2">
                <FormLabel>One-liner</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Your go-to full-stack developer for robust web apps!"
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  A short, catchy phrase about yourself.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem className="col-span-1 md:col-span-2">
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Tell us about yourself..."
                    className="resize-y min-h-[100px]"
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  A detailed description of your experience and passion.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* Languages Section */}
        <h2 className="text-2xl font-bold mt-8">Languages</h2>
        <div className="space-y-4">
          {languageFields.map((field, index) => (
            <div
              key={field.id}
              className="flex flex-col md:flex-row gap-4 border p-4 rounded-md"
            >
              <FormField
                control={form.control}
                name={`languages.${index}.language`}
                render={({ field: languageField }) => (
                  <FormItem className="flex-1">
                    <FormLabel>Language</FormLabel>
                    <FormControl>
                      <Input placeholder="English" {...languageField} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name={`languages.${index}.level`}
                render={({ field: levelField }) => (
                  <FormItem className="flex-1">
                    <FormLabel>Level</FormLabel>
                    <Select
                      onValueChange={levelField.onChange}
                      defaultValue={levelField.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a level" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="Native">Native</SelectItem>
                        <SelectItem value="Fluent">Fluent</SelectItem>
                        <SelectItem value="Conversational">
                          Conversational
                        </SelectItem>
                        <SelectItem value="Basic">Basic</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex items-end">
                <Button
                  type="button"
                  variant="destructive"
                  size="icon"
                  onClick={() => removeLanguage(index)}
                >
                  <MinusCircle className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}
          <Button
            type="button"
            onClick={() => appendLanguage({ language: "", level: "Basic" })}
          >
            <PlusCircle className="mr-2 h-4 w-4" /> Add Language
          </Button>
        </div>

        {/* Skills Section */}
        <h2 className="text-2xl font-bold mt-8">Skills</h2>
        <div className="space-y-4">
          {skillFields.map((field, index) => (
            <div
              key={field.id}
              className="flex gap-4 items-center border p-4 rounded-md"
            >
              <FormField
                control={form.control}
                name={`skills.${index}.name`} // --- CHANGE THIS LINE ---
                render={({ field: skillField }) => (
                  <FormItem className="flex-1">
                    <FormLabel>Skill</FormLabel>
                    <FormControl>
                      <Input placeholder="JavaScript" {...skillField} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button
                type="button"
                variant="destructive"
                size="icon"
                onClick={() => removeSkill(index)}
              >
                <MinusCircle className="h-4 w-4" />
              </Button>
            </div>
          ))}
          <Button type="button" onClick={() => appendSkill({ name: "" })}>
            {" "}
            {/* --- CHANGE THIS LINE --- */}
            <PlusCircle className="mr-2 h-4 w-4" /> Add Skill
          </Button>
        </div>
        {/* Experience Section */}
        <h2 className="text-2xl font-bold mt-8">Experience</h2>
        <div className="space-y-6">
          {experienceFields.map((field, index) => (
            <div key={field.id} className="border p-6 rounded-md space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name={`experience.${index}.company`}
                  render={({ field: expField }) => (
                    <FormItem>
                      <FormLabel>Company</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Tech Solutions Inc."
                          {...expField}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name={`experience.${index}.title`}
                  render={({ field: expField }) => (
                    <FormItem>
                      <FormLabel>Title</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Senior Software Engineer"
                          {...expField}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name={`experience.${index}.startDate`}
                  render={({ field: expField }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>Start Date</FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant={"outline"}
                              className={cn(
                                "w-full pl-3 text-left font-normal",
                                !expField.value && "text-muted-foreground"
                              )}
                            >
                              {expField.value ? (
                                format(new Date(expField.value), "PPP")
                              ) : (
                                <span>Pick a date</span>
                              )}
                              <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={
                              expField.value
                                ? new Date(expField.value)
                                : undefined
                            }
                            onSelect={(date) =>
                              expField.onChange(
                                date?.toISOString().split("T")[0]
                              )
                            } // Store as "YYYY-MM-DD"
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name={`experience.${index}.endDate`}
                  render={({ field: expField }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>End Date</FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant={"outline"}
                              className={cn(
                                "w-full pl-3 text-left font-normal",
                                !expField.value && "text-muted-foreground",
                                form.watch(
                                  `experience.${index}.currentlyWorkingHere`
                                ) && "pointer-events-none opacity-50"
                              )}
                              disabled={form.watch(
                                `experience.${index}.currentlyWorkingHere`
                              )}
                            >
                              {expField.value ? (
                                format(new Date(expField.value), "PPP")
                              ) : (
                                <span>Pick a date</span>
                              )}
                              <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={
                              expField.value
                                ? new Date(expField.value)
                                : undefined
                            }
                            onSelect={(date) =>
                              expField.onChange(
                                date?.toISOString().split("T")[0]
                              )
                            }
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name={`experience.${index}.currentlyWorkingHere`}
                  render={({ field: expField }) => (
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4 col-span-1 md:col-span-2">
                      <FormControl>
                        <Checkbox
                          checked={expField.value}
                          onCheckedChange={(checked) => {
                            expField.onChange(checked);
                            if (checked) {
                              form.setValue(
                                `experience.${index}.endDate`,
                                undefined
                              ); // Clear end date if currently working
                            }
                          }}
                        />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel>Currently working here</FormLabel>
                        <FormDescription>
                          Check if this is your current position.
                        </FormDescription>
                      </div>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name={`experience.${index}.description`}
                  render={({ field: expField }) => (
                    <FormItem className="col-span-1 md:col-span-2">
                      <FormLabel>Description</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Responsibilities and achievements..."
                          {...expField}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="flex justify-end">
                <Button
                  type="button"
                  variant="destructive"
                  size="icon"
                  onClick={() => removeExperience(index)}
                >
                  <MinusCircle className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}
          <Button
            type="button"
            onClick={() =>
              appendExperience({
                company: "",
                title: "",
                startDate: "",
                currentlyWorkingHere: false,
              })
            }
          >
            <PlusCircle className="mr-2 h-4 w-4" /> Add Experience
          </Button>
        </div>

        {/* Education Section */}
        <h2 className="text-2xl font-bold mt-8">Education</h2>
        <div className="space-y-6">
          {educationFields.map((field, index) => (
            <div key={field.id} className="border p-6 rounded-md space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name={`education.${index}.country`}
                  render={({ field: eduField }) => (
                    <FormItem>
                      <FormLabel>Country</FormLabel>
                      <FormControl>
                        <Input placeholder="United States" {...eduField} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name={`education.${index}.university`}
                  render={({ field: eduField }) => (
                    <FormItem>
                      <FormLabel>University</FormLabel>
                      <FormControl>
                        <Input placeholder="State University" {...eduField} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name={`education.${index}.title`}
                  render={({ field: eduField }) => (
                    <FormItem>
                      <FormLabel>Degree Title</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Bachelor of Science"
                          {...eduField}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name={`education.${index}.major`}
                  render={({ field: eduField }) => (
                    <FormItem>
                      <FormLabel>Major</FormLabel>
                      <FormControl>
                        <Input placeholder="Computer Science" {...eduField} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name={`education.${index}.year`}
                  render={({ field: eduField }) => (
                    <FormItem>
                      <FormLabel>Year of Graduation</FormLabel>
                      <FormControl>
                        <Input placeholder="2018" {...eduField} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="flex justify-end">
                <Button
                  type="button"
                  variant="destructive"
                  size="icon"
                  onClick={() => removeEducation(index)}
                >
                  <MinusCircle className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}
          <Button
            type="button"
            onClick={() =>
              appendEducation({
                country: "",
                university: "",
                title: "",
                major: "",
                year: "",
              })
            }
          >
            <PlusCircle className="mr-2 h-4 w-4" /> Add Education
          </Button>
        </div>

        {/* Social Links Section */}
        <h2 className="text-2xl font-bold mt-8">Social Links</h2>
        <div className="space-y-4">
          {socialLinkFields.map((field, index) => (
            <div
              key={field.id}
              className="flex flex-col md:flex-row gap-4 border p-4 rounded-md"
            >
              <FormField
                control={form.control}
                name={`socialLinks.${index}.platform`}
                render={({ field: socialField }) => (
                  <FormItem className="flex-1">
                    <FormLabel>Platform</FormLabel>
                    <FormControl>
                      <Input placeholder="LinkedIn" {...socialField} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name={`socialLinks.${index}.link`}
                render={({ field: socialField }) => (
                  <FormItem className="flex-1">
                    <FormLabel>Link</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="https://linkedin.com/in/johndoe"
                        {...socialField}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex items-end">
                <Button
                  type="button"
                  variant="destructive"
                  size="icon"
                  onClick={() => removeSocialLink(index)}
                >
                  <MinusCircle className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}
          <Button
            type="button"
            onClick={() => appendSocialLink({ platform: "", link: "" })}
          >
            <PlusCircle className="mr-2 h-4 w-4" /> Add Social Link
          </Button>
        </div>

        {/* Certificates Section */}
        <h2 className="text-2xl font-bold mt-8">Certificates</h2>
        <div className="space-y-4">
          {certificateFields.map((field, index) => (
            <div
              key={field.id}
              className="flex flex-col md:flex-row gap-4 border p-4 rounded-md"
            >
              <FormField
                control={form.control}
                name={`certificates.${index}.name`}
                render={({ field: certField }) => (
                  <FormItem className="flex-1">
                    <FormLabel>Certificate Name</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="AWS Certified Developer – Associate"
                        {...certField}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name={`certificates.${index}.from`}
                render={({ field: certField }) => (
                  <FormItem className="flex-1">
                    <FormLabel>Issued By</FormLabel>
                    <FormControl>
                      <Input placeholder="Amazon Web Services" {...certField} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name={`certificates.${index}.year`}
                render={({ field: certField }) => (
                  <FormItem className="flex-1">
                    <FormLabel>Year</FormLabel>
                    <FormControl>
                      <Input placeholder="2022" {...certField} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex items-end">
                <Button
                  type="button"
                  variant="destructive"
                  size="icon"
                  onClick={() => removeCertificate(index)}
                >
                  <MinusCircle className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}
          <Button
            type="button"
            onClick={() => appendCertificate({ name: "", from: "", year: "" })}
          >
            <PlusCircle className="mr-2 h-4 w-4" /> Add Certificate
          </Button>
        </div>

        <Button type="submit" className="mt-8">
          Save Profile
        </Button>
      </form>
    </Form>
  );
}

export default ProfileForm;
